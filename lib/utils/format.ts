export function formatNumber(num: number) {
  if (num < 100000) {
    return num.toLocaleString(); // Add commas to numbers below 100,000
  } else if (num >= 100000 && num < 1000000) {
    return (num / 1000).toFixed(0) + "K"; // Format numbers from 100,000 to 999,999
  } else if (num >= 1000000 && num < 1000000000) {
    return (num / 1000000).toFixed(2) + "M"; // Format numbers from 1,000,000 to 999,999,999
  } else if (num >= 1000000000 && num < 1000000000000) {
    return (num / 1000000000).toFixed(2) + "B"; // Format numbers from 1,000,000,000 to 999,999,999,999
  } else {
    return (num / 1000000000000).toFixed(2) + "T"; // Format numbers from 1,000,000,000,000 and above
  }
}

export function wordedDate(d: string) {
  const date = new Date(d);

  const datePart = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${datePart} ${timePart}`;
}
