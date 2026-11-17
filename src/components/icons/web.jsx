import { Svg } from "./svg";

/** Browser window dengan chevron kode — web & programming. */
export default function WebIcon(props) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="4" width="19" height="16" rx="2" />
      <path d="M2.5 9h19" />
      <path d="M11.5 12 8.5 15l3 3M13.5 12l3 3-3 3" />
    </Svg>
  );
}
