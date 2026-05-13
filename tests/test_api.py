"""
Basic API tests for Face Track Backend.
Run with: pytest tests/ -v
"""
import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.fixture
async def client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        yield c


@pytest.mark.asyncio
async def test_health(client):
    r = await client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "healthy"


@pytest.mark.asyncio
async def test_register_and_login(client):
    # Register
    r = await client.post("/auth/register", json={
        "email": "test@example.com",
        "password": "test1234",
        "full_name": "Test User",
        "role": "admin",
    })
    assert r.status_code in (201, 400)  # 400 if already exists

    # Login
    r = await client.post("/auth/login", json={
        "email": "test@example.com",
        "password": "test1234",
    })
    assert r.status_code == 200
    data = r.json()
    assert "access_token" in data
    assert "refresh_token" in data
    return data["access_token"]


@pytest.mark.asyncio
async def test_login_wrong_password(client):
    r = await client.post("/auth/login", json={
        "email": "test@example.com",
        "password": "wrongpassword",
    })
    assert r.status_code == 401


@pytest.mark.asyncio
async def test_protected_route_without_token(client):
    r = await client.get("/admin/dashboard")
    assert r.status_code == 401
