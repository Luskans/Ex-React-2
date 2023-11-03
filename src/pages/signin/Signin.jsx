import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import './Signin.css';

export default function Signin() {
    // const {
    //     register,
    //     handleSubmit,
    //     watch,
    //     formState: { errors },
    // } = useForm();

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("firstName")} />
          <select {...register("gender")}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
          <input type="submit" />
        </form>
    )

    // return (
    //     <section className='signin'>
    //         <h1>Inscription</h1>
    //         <form className='signin__form' onSubmit={handleSubmit(onSubmit)}>
    //             <TextField 
    //                 required 
    //                 fullWidth 
    //                 id="outlined-basic" 
    //                 label="Prénom" 
    //                 variant="outlined" 
    //                 {...register("firstname", {
    //                     required: "Veuillez saisir un prénom.",
    //                     minLength: {
    //                         value: 5, message: "Veuillez saisir un prénom d'au moins 5 caractères."
    //                     }
    //                 })}
    //             />
    //             <TextField 
    //                 required 
    //                 fullWidth 
    //                 id="outlined-basic" 
    //                 label="Nom" 
    //                 variant="outlined" 
    //                 {...register("lastname", {
    //                     required: "Veuillez saisir un nom.",
    //                     minLength: {
    //                         value: 5, message: "Veuillez saisir un nom d'au moins 5 caractères."
    //                     }
    //                 })}
    //             />
    //             <TextField 
    //                 required 
    //                 fullWidth 
    //                 id="outlined-basic" 
    //                 label="Email" 
    //                 variant="outlined" 
    //                 {...register("email")}
    //             />
    //             <TextField 
    //                 required 
    //                 fullWidth 
    //                 type="password"
    //                 id="outlined-basic" 
    //                 label="Password" 
    //                 variant="outlined" 
    //                 {...register("password", {
    //                     required: "Veuillez saisir un mot de passe.",
    //                     minLength: {
    //                         value: 6, message: "Veuillez saisir un nom d'au moins 6 caractères."
    //                     }
    //                 })}
    //             />
    //             <TextField 
    //                 required 
    //                 fullWidth
    //                 type="password" 
    //                 id="outlined-basic" 
    //                 label="Confirmation password" 
    //                 variant="outlined" 
    //                 {...register("")}
    //             />
    //             <FormControlLabel 
    //                 required 
    //                 control={<Checkbox />} 
    //                 label="J'accepte les CGU."
    //             />
    //             <Button 
    //                 className='signin__button'
    //                 type="submit"
    //                 variant="contained"
    //             >
    //                 Sinscrire
    //             </Button>
    //         </form>
    //     </section>
    // )
}
