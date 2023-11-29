export default function ConvertTimeSlotToNiceTime(timeslot: string) {
    switch(timeslot) {
        case "EIGHT": return "08.00"
        case "NINE": return "09.00"
        case "TEN": return "10.00"
        case "ELEVEN": return "11.00"
        case "TWELVE": return "12.00"
        case "THIRTEEN": return "13.00"
        case "FOURTEEN": return "14.00"
        case "FIFTEEN": return "15.00"
        case "SIXTEEN": return "16.00"
    }
}