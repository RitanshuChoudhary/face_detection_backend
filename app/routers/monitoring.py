from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.database import get_db
from app.models import models
from app.schemas import schemas
from app.services.jwt_service import get_current_user

router = APIRouter(
    prefix="/monitoring",
    tags=["Monitoring"]
)

@router.post("/logs", status_code=status.HTTP_201_CREATED, response_model=schemas.MonitoringLogOut)
async def create_monitoring_log(
    log: schemas.MonitoringLogCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Store a scraped monitoring log (SMS/WhatsApp) sent from the mobile app.
    """
    user_id = int(current_user["sub"])
    new_log = models.MonitoringLog(
        user_id=user_id,
        log_type=log.log_type,
        sender=log.sender,
        content=log.content,
        timestamp=log.timestamp,
        package_name=log.package_name,
        device_info=log.device_info
    )
    db.add(new_log)
    await db.commit()
    await db.refresh(new_log)
    return new_log

@router.get("/logs", response_model=List[schemas.MonitoringLogOut])
async def get_monitoring_logs(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
    limit: int = 100
):
    """
    Retrieve monitoring logs for the current user.
    """
    user_id = int(current_user["sub"])
    result = await db.execute(
        select(models.MonitoringLog)
        .filter(models.MonitoringLog.user_id == user_id)
        .order_by(models.MonitoringLog.timestamp.desc())
        .limit(limit)
    )
    logs = result.scalars().all()
    return logs
