const Validation = (obj) => {
    let errors = {
        firstName:'',
        lastName:'',
        phoneNumber:'',
        email:'',
        password:'',
        newPassword:'',
        retypeNewPassword:''
    };
    const emailRegex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,})$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(!obj.firstName){
        errors.firstName = "First name is required";
    }
    else if(obj.firstName.length < 2){
        errors.email = "First name should be minimum of 2 letters";
    }

    if(!obj.lastName){
        errors.lastName = "Last name is required";
    }

    if(!obj.phoneNumber){
        errors.phoneNumber = "Phone number is required";
    }
    else if(obj.phoneNumber.length < 10){
        errors.phoneNumber = "Phone number should be of 10 letters";
    }

    if(!obj.email){
        errors.email = "Email is required";
    }
    else if(!emailRegex.test(obj.email)){
        errors.email = "Enter a proper e-mail";
    }

    if(!obj.password){
        errors.password = "Password is required";
    }
    else if(!passwordRegex.test(obj.password)){
        errors.password = "Enter a Strong password";
    }

    if(!obj.newPassword){
        errors.newPassword = "Password is required";
    }
    else if(!passwordRegex.test(obj.newPassword)){
        errors.newPassword = "Enter a Strong password";
    }

    if(!obj.retypeNewPassword){
        errors.retypeNewPassword = "Password is required";
    }
    else if(!passwordRegex.test(obj.retypeNewPassword)){
        errors.retypeNewPassword = "Enter a Strong password";
    }

    return errors;
}

export default Validation;