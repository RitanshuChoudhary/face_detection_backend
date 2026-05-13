import io
import pandas as pd
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.units import inch
from datetime import datetime


def generate_csv(records: list[dict]) -> bytes:
    """Generate CSV bytes from attendance records."""
    df = pd.DataFrame(records)
    buf = io.BytesIO()
    df.to_csv(buf, index=False)
    return buf.getvalue()


def generate_excel(records: list[dict], sheet_name: str = "Attendance") -> bytes:
    """Generate Excel bytes from attendance records."""
    df = pd.DataFrame(records)
    buf = io.BytesIO()
    with pd.ExcelWriter(buf, engine="openpyxl") as writer:
        df.to_excel(writer, index=False, sheet_name=sheet_name)
    return buf.getvalue()


def generate_pdf(
    title: str,
    records: list[dict],
    summary: dict = None
) -> bytes:
    """Generate a PDF attendance report."""
    buf = io.BytesIO()
    doc = SimpleDocTemplate(
        buf,
        pagesize=A4,
        rightMargin=0.5 * inch,
        leftMargin=0.5 * inch,
        topMargin=0.5 * inch,
        bottomMargin=0.5 * inch,
    )
    styles = getSampleStyleSheet()
    elements = []

    # Title
    elements.append(Paragraph(title, styles["Title"]))
    elements.append(Paragraph(f"Generated: {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}", styles["Normal"]))
    elements.append(Spacer(1, 0.2 * inch))

    # Summary box
    if summary:
        summary_data = [[k, str(v)] for k, v in summary.items()]
        summary_table = Table(summary_data, colWidths=[3 * inch, 2 * inch])
        summary_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#f0f4ff")),
            ("TEXTCOLOR", (0, 0), (0, -1), colors.HexColor("#1a1a2e")),
            ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 10),
            ("ROWBACKGROUNDS", (0, 0), (-1, -1), [colors.HexColor("#e8eeff"), colors.white]),
            ("BOX", (0, 0), (-1, -1), 0.5, colors.grey),
            ("INNERGRID", (0, 0), (-1, -1), 0.25, colors.grey),
            ("PADDING", (0, 0), (-1, -1), 6),
        ]))
        elements.append(summary_table)
        elements.append(Spacer(1, 0.2 * inch))

    # Records table
    if records:
        headers = list(records[0].keys())
        table_data = [headers] + [[str(row.get(h, "")) for h in headers] for row in records]

        col_width = (7 * inch) / len(headers)
        data_table = Table(table_data, colWidths=[col_width] * len(headers))
        data_table.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1a73e8")),
            ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
            ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
            ("FONTSIZE", (0, 0), (-1, -1), 9),
            ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f9f9f9")]),
            ("BOX", (0, 0), (-1, -1), 0.5, colors.grey),
            ("INNERGRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#dddddd")),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("PADDING", (0, 0), (-1, -1), 5),
        ]))
        elements.append(data_table)

    doc.build(elements)
    return buf.getvalue()
