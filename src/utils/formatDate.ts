export default function formatDate(date: number | Date) {
  return new Intl.DateTimeFormat("en-GB").format(date);
}
