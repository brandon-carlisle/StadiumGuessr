import type { BaseHTMLAttributes } from "react";

interface CardProps extends BaseHTMLAttributes<HTMLDivElement> {}

export function Card(props: CardProps) {
	return <div className="card bg-base-200">{props.children}</div>;
}
