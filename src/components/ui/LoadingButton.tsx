import LoadingSpinner from "./LoadingSpinner";

export default function LoadingButton() {
  return (
    <button className="btn-disabled btn-sm btn md:btn-md">
      <LoadingSpinner />
    </button>
  );
}
