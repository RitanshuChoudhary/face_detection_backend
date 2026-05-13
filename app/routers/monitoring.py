from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import models
from app.schemas import schemas
from app.auth.oauth2 import get_current_user

router = APIRouter(
    prefix="/monitoring",
    tags=["Monitoring"]
)

@router.post("/logs", status_code=status.HTTP_201_CREATED, response_model=schemas.MonitoringLogOut)
def create_monitoring_log(
    log: schemas.MonitoringLogCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Store a scraped monitoring log (SMS/WhatsApp) sent from the mobile app.
    """
    new_log = models.MonitoringLog(
        user_id=current_user.id,
        log_type=log.log_type,
        sender=log.sender,
        content=log.content,
        timestamp=log.timestamp,
        package_name=log.package_name,
        device_info=log.device_info
    )
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    return new_log

@router.get("/logs", response_model=List[schemas.MonitoringLogOut])
def get_monitoring_logs(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
    limit: int = 100
):
    """
    Retrieve monitoring logs for the current user.
    """
    logs = db.query(models.MonitoringLog)\
        .filter(models.MonitoringLog.user_id == current_user.id)\
        .order_by(models.MonitoringLog.timestamp.desc())\
        .limit(limit)\
        .all()
    return logs
