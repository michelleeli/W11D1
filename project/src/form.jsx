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

        if (user.email.length === 0) {
            errors.push("Email cannot be empty")
        }

        if (user.email.split("@").length !== 2) {
            errors.push("Invalid email")
        }

        if (user.phoneNumber && (user.phoneNumber !== new RegExp('^[0-9]+$'))) {
            errors.push("Invalid phone number")
        }

        if (user.phoneNumber && !["Home", "Work", "Mobile"].includes(user.phoneType.value) ) {
            errors.push("Select a phone type")
        }
        if (user.bio.length > 280) {
            errors.push("Bio too long")
        }
        return errors;
    }

    const handleChange = (field) => {
        return (e) => {
            user[field] = e.target.value

            setUser({
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                phoneType: user.phoneType,
                staff: user.staff,
                bio: user.bio,
                checkBox: user.checkBox

            })
        }

    }
    return (
        
        <form className="form">
            <input type="text" placeholder="Name" value={user.name} onChange={handleChange("name")}/>
            <br/>

            <input type="text" placeholder="Email" value={user.email } onChange={handleChange("email")}/>
            <br/>

            <input type="text" placeholder="Phone number" value={user.phoneNumber} onChange={handleChange("phoneNumber")}/>
            <br/>

            <select placeholder="Phone type" value={user.phoneType} onChange={handleChange("phoneType")}>
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Mobile">Mobile</option>
            </select>
            <br/>

            <div onChange={handleChange("staff")}>
            <label>Instructor
                <input name="staff" type="radio" value="Instructor"/>
            </label>

            <label>Student
                <input name="staff" type="radio" value="Student"/>
            </label>
            </div>
            
            <br/>

            <textarea id="bio" placeholder="Bio" value={user.bio} onChange={handleChange("bio")}/>
                <label for="bio"></label>
            <br/>

            <input type="checkbox" id="checkbox" value="Checked" onChange={handleChange("checkbox")}/>
                <label for="checkbox">Sign Up for Email notifications</label>
            <br/>
            <button>Submit</button>
        </form>
    )
}


export default Form;