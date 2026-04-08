"""
script.json → script.md 변환 유틸리티

사용법 (Claude Code 스킬에서 호출):
  from orchestrator.run_script import generate_script_md
"""

from pathlib import Path


VISUAL_TYPE_LABELS = {
    "intro_card":      "🎬 인트로",
    "outro_card":      "👋 아웃트로",
    "stat_card":       "📊 통계 카드",
    "bullet_list":     "📋 목록",
    "timeline":        "📅 타임라인",
    "comparison":      "⚖️ 비교",
    "number_highlight":"🔢 숫자 강조",
    "keyword":         "🔑 키워드",
    "chart":           "📈 차트",
    "quote_card":      "💬 인용구",
    "flow_diagram":    "➡️ 흐름도",
    "news_feed":       "📰 뉴스피드",
    "step_flow":       "🪜 단계별",
    "table_data":      "📑 표",
    "pros_cons":       "✅❌ 장단점",
    "ranking_list":    "🏆 순위",
    "callout_box":     "💡 강조박스",
    "ticker_board":    "💹 시세판",
}


def format_visual_data(visual_type: str, visual_data: dict | None, chart_data: list | None, chart_title: str | None) -> str:
    if not visual_data and not chart_data:
        return ""

    lines = []

    if visual_type == "stat_card" and visual_data:
        lines.append(f"  - 수치: **{visual_data.get('big_number', '')}** {visual_data.get('big_label', '')}")
        lines.append(f"  - 제목: {visual_data.get('card_title', '')}")
        for item in visual_data.get("card_items", []):
            lines.append(f"  - {item}")

    elif visual_type == "bullet_list" and visual_data:
        lines.append(f"  - {visual_data.get('title', '')}")
        for item in visual_data.get("items", []):
            lines.append(f"    - {item}")

    elif visual_type == "keyword" and visual_data:
        lines.append(f"  - 키워드: **{visual_data.get('keyword', '')}**")
        lines.append(f"  - 설명: {visual_data.get('description', '')}")
        for pt in visual_data.get("sub_points", []):
            lines.append(f"    - {pt}")

    elif visual_type == "chart" and chart_data:
        lines.append(f"  - 차트: {chart_title or ''}")
        for bar in chart_data[:5]:
            lines.append(f"    - {bar.get('label', '')}: {bar.get('value', '')}")
        if len(chart_data) > 5:
            lines.append(f"    - ... 외 {len(chart_data) - 5}개")

    return "\n".join(lines)


def generate_script_md(script, workspace_path: Path) -> Path:
    mins = int(script.total_duration_seconds // 60)
    secs = int(script.total_duration_seconds % 60)
    content_count = sum(1 for s in script.scenes if s.type == "content")

    lines = [
        f"# {script.title}",
        f"",
        f"> {script.hook}",
        f"",
        f"| 항목 | 내용 |",
        f"|------|------|",
        f"| 총 길이 | {mins}분 {secs}초 ({script.total_duration_seconds:.0f}초) |",
        f"| 장면 수 | 총 {len(script.scenes)}개 (본편 {content_count}개) |",
        f"| 태그 | {', '.join(f'`{t}`' for t in script.tags)} |",
        f"",
        f"## 유튜브 설명란",
        f"",
        f"```",
        f"📌 {script.title}",
        f"",
        f"✅ 이 영상에서 다루는 내용",
        f"(대본 확인 후 핵심 내용을 직접 작성해주세요)",
        f"",
        f"⚠️ 본 영상은 투자 권유가 아닌 개인적인 분석과 의견입니다.",
        f"투자의 최종 판단과 책임은 본인에게 있습니다.",
        f"",
        f"{''.join(f'#{t} ' for t in script.tags)}",
        f"```",
        f"",
        f"---",
        f"",
        f"## 장면별 대본",
        f"",
    ]

    cumulative = 0.0
    for i, scene in enumerate(script.scenes):
        start_m = int(cumulative // 60)
        start_s = int(cumulative % 60)
        end = cumulative + scene.duration_seconds
        end_m = int(end // 60)
        end_s = int(end % 60)

        type_emoji = {"intro": "🎬", "content": "📺", "chart": "📈", "outro": "👋"}.get(scene.type, "▶")
        visual_label = VISUAL_TYPE_LABELS.get(scene.visual_type, scene.visual_type)

        lines.append(f"### {type_emoji} 장면 {i + 1} — {visual_label}")
        lines.append(f"")
        lines.append(f"**시간:** {start_m:02d}:{start_s:02d} ~ {end_m:02d}:{end_s:02d} ({scene.duration_seconds:.0f}초)")
        lines.append(f"")
        lines.append(f"**나레이션:**")
        lines.append(f"> {scene.narration}")
        lines.append(f"")

        visual_str = format_visual_data(
            scene.visual_type,
            scene.visual_data,
            [c.model_dump() for c in scene.chart_data] if scene.chart_data else None,
            scene.chart_title,
        )
        if visual_str:
            lines.append(f"**화면 구성:**")
            lines.append(visual_str)
            lines.append(f"")

        lines.append(f"---")
        lines.append(f"")
        cumulative = end

    md_path = workspace_path / "script.md"
    md_path.write_text("\n".join(lines), encoding="utf-8")
    return md_path
