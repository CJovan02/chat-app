import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function formatMessageTime(date: Date): string {
  const now = dayjs();
  const messageDate = dayjs(date);

  const diffInDays = now.diff(messageDate, 'day');

  if (diffInDays === 0) {
    // ista godina i dan → relativno vreme: 1m ago, 2h ago
    return messageDate.fromNow(); // dayjs relativeTime
  } else if (diffInDays < 7) {
    // poruke unutar nedelje → prikaži "Tue" ili "Mon"
    return messageDate.format('ddd'); // Mon, Tue...
  } else if (now.year() === messageDate.year()) {
    // iste godine → prikaži datum bez godine: "Feb 1"
    return messageDate.format('MMM D');
  } else {
    // različite godine → prikazi pun datum: "Feb 1, 2025"
    return messageDate.format('MMM D, YYYY');
  }
}
