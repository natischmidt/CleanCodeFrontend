import {useState} from "react";
import customer from "../../../API/customer";
import {useUserType} from "../../context/UserTypeContext";

interface ISetTempEmail {
    email: (tempMail: string) => void
    toCalendar: (jobType: string) => void
    jobType: string
}

export default function SetTempEmail({email, jobType, toCalendar}: ISetTempEmail) {

    const [tempMail, setTempMail] = useState('')
    const {setId} = useUserType();
    const setTheEmail = () => {
        email(tempMail)

        customer.registerTemp(tempMail, setId).then(r => {
                toCalendar(jobType)
        }

        )
    }



    return (
        <div>
            <input
                placeholder={"enter your email address"}
                onChange={(value) => setTempMail(value.target.value)}
            />
            <button
                onClick={() => setTheEmail()}
            >Submit</button>
        </div>
    )
}