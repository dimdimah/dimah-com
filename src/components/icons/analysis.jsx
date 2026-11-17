import { Svg } from "./svg";

/** Diagram alur requirement — product & systems analysis. */
export default function AnalysisIcon(props) {
  return (
    <Svg {...props}>
      <rect x="9" y="2.5" width="6" height="5" rx="1" />
      <rect x="2.5" y="16.5" width="6" height="5" rx="1" />
      <rect x="15.5" y="16.5" width="6" height="5" rx="1" />
      <path d="M12 7.5v4.5M12 12H5.5v4.5M12 12h6.5v4.5" />
    </Svg>
  );
}
