import LoadingSpinner from "./spinner";

export default function LoadingButton() {
  return (
    <button className="btn-disabled btn-sm btn md:btn-md">
      <LoadingSpinner />
    </button>
  );
}
