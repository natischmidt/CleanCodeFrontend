
interface IEditPersonalInformationModal {
    userData: object
    showThisComp: boolean
}

export default function EditPersonalInformationComponent ({userData, showThisComp}: IEditPersonalInformationModal) {


    return (
        <div>
        <div style = {styles.container}>
            <div style={styles.field}>{userData.firstName}</div>
            <div style={styles.field}>{userData.lastName}</div>
            <div style={styles.field}>{userData.email}</div>
            <div style={styles.field}>{userData.address}</div>
            <div style={styles.field}>{userData.phoneNumber}</div>



            <button onClick={() => showThisComp(false)}>close it!</button>
        </div>
        </div>
    )
}

const styles = {
    field: {
        backgroundColor : "#b3d9e3",
        margin: "0.3rem",

    },
    container: {
        flex: 1,
        width: "50%",
        alignSelf: "center",
        justifySelf: "center",

     }
}

