from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from app.config import settings

engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    pool_size=10,
    max_overflow=20,
    pool_pre_ping=True,
)

AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    pass


async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def create_tables():
    """Create all tables on startup (for development). Use Alembic in production."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
        # Hot-migrate DB columns and enums
        from sqlalchemy import text
        try:
            await conn.execute(text("ALTER TYPE attendancestatus ADD VALUE IF NOT EXISTS 'leave';"))
        except Exception:
            pass
            
        try:
            await conn.execute(text("ALTER TABLE teachers ADD COLUMN IF NOT EXISTS class_id INTEGER REFERENCES classes(id);"))
        except Exception:
            pass
