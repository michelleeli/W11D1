import { useState } from "react";


function Form() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        phoneType: "",
        staff: "",
        bio: "",
        checkBox: ""
    });
    const validate = () => {
        let errors = [];

        if (user.name.length === 0) {
            errors.push("Name cannot be empty")
        }

        if ((user.email.length === 0) || (user.email.split("@").length !== 2)) {
            errors.push("Invalid email")
        }
        // let reg = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
        let reg = /^\d{10}$/
        if (!reg.test(user.phoneNumber)) {
            errors.push("Invalid phone number")
        }
        if (user.phoneNumber && !["Home", "Work", "Mobile"].includes(user.phoneType)) {
            errors.push("Select a phone type")
        }
        if (!["Instructor", "Student"].includes(user.staff)) {
            errors.push("Select staff")
        }
        console.log(user.staff)
        if (user.bio.length > 280) {
            errors.push("Max 280 characters")
        }
        return errors;
    }

    const handleChange = (field) => {
        return (e) => {
            const newObj = Object.assign({}, user, { [field]: e.target.value })
            setUser(newObj);
        }

    }

    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault();

        let errors = validate();
        setErrors(errors)

        if (errors.length === 0) {
            setUser({
                name: "",
                email: "",
                phoneNumber: "",
                phoneType: "",
                staff: "",
                bio: "",
                checkBox: ""
            })
        }
    }

    const showErrors = () => {
        if (!errors.length) return null;
        return (
            <ul>
                {errors.map(error => <li>{error}</li>)}
            </ul>
        )
    }


    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={user.name} onChange={handleChange("name")} />
                <br />

                <input type="text" placeholder="Email" value={user.email} onChange={handleChange("email")} />
                <br />

                <input type="text" placeholder="Phone number" value={user.phoneNumber} onChange={handleChange("phoneNumber")} />
                <br />

                <select placeholder="Phone type" value={user.phoneType} onChange={handleChange("phoneType")}> Phone Type:
                    <option value="select" selected>Select</option>
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Mobile">Mobile</option>
                </select>
                <br />

                <label>Instructor
                    <input name="staff" type="radio" value="Instructor" checked={user.staff === "Instructor" ? "checked" : ""} onChange={handleChange("staff")}
                    />
                </label>

                <label>Student
                    <input name="staff" type="radio" value="Student"
                        checked={user.staff === "Student" ? "checked" : ""} onChange={handleChange("staff")}
                    />
                </label>

                <br />

                <textarea id="bio" placeholder="Bio" value={user.bio} onChange={handleChange("bio")} />
                <br />

                <label>Sign Up for Email notifications
                    <input type="checkbox" id="checkbox" value="Checked" onChange={handleChange("checkbox")} />
                </label>
                <br />
                <button>Submit</button>
            </form>
            <h3>
                {showErrors()}
            </h3>

        </>
    )
}


export default Form;