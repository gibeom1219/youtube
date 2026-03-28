"""
대본 작성 단독 실행 스크립트

사용법:
  cd /home/user/workspaces/youtube
  python -m orchestrator.run_script "주제"
"""

import sys
import uuid
import json
from pathlib import Path

from orchestrator.config import WORKSPACE_DIR
from orchestrator.steps.script_writer import write_script


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

    elif visual_type == "timeline" and visual_data:
        lines.append(f"  - {visual_data.get('title', '')}")
        for item in visual_data.get("items", []):
            lines.append(f"    - {item.get('label', '')} → {item.get('value', '')} ({item.get('note', '')})")

    elif visual_type == "comparison" and visual_data:
        lines.append(f"  - {visual_data.get('left_label', '')} vs {visual_data.get('right_label', '')}")

    elif visual_type == "number_highlight" and visual_data:
        lines.append(f"  - **{visual_data.get('number', '')}{visual_data.get('unit', '')}** {visual_data.get('label', '')}")

    elif visual_type == "quote_card" and visual_data:
        lines.append(f"  - \"{visual_data.get('quote', '')}\"")
        lines.append(f"  - — {visual_data.get('speaker', '')}, {visual_data.get('role', '')}")

    elif visual_type == "flow_diagram" and visual_data:
        steps = visual_data.get("steps", [])
        lines.append(f"  - {visual_data.get('title', '')}")
        lines.append(f"  - {' → '.join(s.get('label', '') for s in steps)}")

    elif visual_type == "news_feed" and visual_data:
        lines.append(f"  - {visual_data.get('title', '')}")
        for item in visual_data.get("items", []):
            lines.append(f"    - [{item.get('category', '')}] {item.get('headline', '')}")

    elif visual_type == "step_flow" and visual_data:
        lines.append(f"  - {visual_data.get('title', '')}")
        for step in visual_data.get("steps", []):
            lines.append(f"    - {step.get('step', '')}. {step.get('title', '')}: {step.get('description', '')}")

    elif visual_type == "table_data" and visual_data:
        lines.append(f"  - {visual_data.get('title', '')}")
        headers = visual_data.get("headers", [])
        if headers:
            lines.append(f"  - 열: {' | '.join(headers)}")
        for row in visual_data.get("rows", []):
            lines.append(f"    - {' | '.join(row)}")

    elif visual_type == "pros_cons" and visual_data:
        lines.append(f"  - {visual_data.get('title', '')}")
        for pro in visual_data.get("pros", []):
            lines.append(f"    - ✅ {pro}")
        for con in visual_data.get("cons", []):
            lines.append(f"    - ❌ {con}")

    elif visual_type == "ranking_list" and visual_data:
        lines.append(f"  - {visual_data.get('title', '')}")
        for item in visual_data.get("items", []):
            lines.append(f"    - {item.get('rank', '')}위. {item.get('name', '')} {item.get('value', '')}{visual_data.get('unit', '')}")

    elif visual_type == "callout_box" and visual_data:
        lines.append(f"  - {visual_data.get('label', '')}: **{visual_data.get('message', '')}**")
        if visual_data.get("sub"):
            lines.append(f"  - {visual_data.get('sub', '')}")

    elif visual_type == "ticker_board" and visual_data:
        lines.append(f"  - {visual_data.get('title', '')}")
        for item in visual_data.get("items", []):
            lines.append(f"    - {item.get('symbol', '')} {item.get('price', '')} ({item.get('change_pct', '')})")

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
    ]

    # 핵심 내용 추출: content 씬의 나레이션 앞 40자를 개조식으로
    for scene in script.scenes:
        if scene.type == "content":
            summary = scene.narration[:60].rstrip()
            if not summary.endswith((".", "요", "죠", "다")):
                summary = summary.rsplit(" ", 1)[0]
            lines.append(f"• {summary}")

    lines += [
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


def main():
    if len(sys.argv) < 2:
        print("사용법: python -m orchestrator.run_script \"주제\"")
        sys.exit(1)

    topic = " ".join(sys.argv[1:])
    job_id = str(uuid.uuid4())[:8]
    workspace_path = WORKSPACE_DIR / job_id
    workspace_path.mkdir(parents=True, exist_ok=True)

    print(f"\n{'='*55}")
    print(f"  📝 대본 작성")
    print(f"  주제: {topic}")
    print(f"  Workspace ID: {job_id}")
    print(f"  경로: {workspace_path}")
    print(f"{'='*55}\n")

    script = write_script(topic, workspace_path)
    md_path = generate_script_md(script, workspace_path)

    print(f"\n{'='*55}")
    print(f"  ✅ 대본 작성 완료")
    print(f"{'='*55}")
    print(f"\n  제목: {script.title}")
    print(f"  훅: {script.hook}")
    print(f"  총 길이: {script.total_duration_seconds:.0f}초 ({script.total_duration_seconds/60:.1f}분)")
    print(f"  장면 수: {len(script.scenes)}개\n")

    for i, scene in enumerate(script.scenes):
        narration_preview = scene.narration[:60] + "..." if len(scene.narration) > 60 else scene.narration
        print(f"  [{i+1}] {scene.type.upper()} | {scene.visual_type} | {scene.duration_seconds:.0f}초")
        print(f"       {narration_preview}")

    print(f"\n{'='*55}")
    print(f"  📁 script.json 저장됨: {workspace_path / 'script.json'}")
    print(f"  📄 script.md  저장됨: {md_path}")
    print(f"  ➡️  다음 단계: /make-audio {job_id}")
    print(f"{'='*55}\n")


if __name__ == "__main__":
    main()
