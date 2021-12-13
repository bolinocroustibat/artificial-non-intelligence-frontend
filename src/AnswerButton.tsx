export function AnswerButton(props) {
    if (props.type === "ai") {
        return "<div class='button'>I think it's<span>🤖</span>AI-GENERATED</div>";
    } else if (props.type === "human") {
        return "<div class='button'>I think it's<span>👩</span>HUMAN-GENERATED</div>";
    }
}
