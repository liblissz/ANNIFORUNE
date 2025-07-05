export function formDate(date){
    return date.toLocaleString('en-US', {
        month: "short",
        day: "numeric",
        year: "numeric"
    })
}