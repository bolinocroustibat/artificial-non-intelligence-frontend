interface FormatAnswerButtonProps {
    type: string
}

function AnswerButton({ type }: FormatAnswerButtonProps): JSX.Element | null {
    if (type === "ai") {
        return <div class='button'>I think it\'s<span>🤖</span>AI-GENERATED</div>;
    } else if (type === "human") {
        return <div class='button'>I think it\'s<span>👩</span>HUMAN-GENERATED</div>;
    }
    return null;
}
