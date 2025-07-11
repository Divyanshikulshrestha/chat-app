// export function formatMessageTime(date){
//     return new Date(date).toLocaleDateString("en-US",{
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: false,
//     })
// }



export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use true for 12-hour format (AM/PM)
  });
}
