import { Button, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import './Signin.css';
import React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// type FormValues = {
//     firstname: string;
//     email: string;
//     password: string;
//     passwordConfirmation: String;
//     checkbox: boolean;
// }

export default function Signin() {
    const navigate = useNavigate();
    // const form = useForm<FormValues>({
    const form = useForm({
        defaultValues: {
            firstname: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            checkbox: false
        }
    });
    const { register, handleSubmit, formState, watch } = form;
    const { errors } = formState;

    const onSubmit = (data) => {
        console.log(data);
        Promise.all([
            axios.get(`http://localhost:3000/users?firstname=${data.firstname}`),
            axios.get(`http://localhost:3000/users?email=${data.email}`)
        ])
        .then((response) => {
            const firstname = response[0].data
            const email = response[1].data
            if (firstname.length > 0) {
                alert('Prénom déjà utilisé');
            } else if (email.length > 0) {
                alert('Email déjà utilisé');
            } else {
                axios
                .post('http://localhost:3000/users', data)
                .then((response) => {
                    console.log(response);
                    navigate('/login');
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [showPasswordConfirmation, setShowPasswordConfirmation] = React.useState(false);
    const handleClickShowPasswordConfirmation = () => setShowPasswordConfirmation((show) => !show);
    // const handleMouseDownPasswordConfirmation = (event: React.MouseEvent<HTMLButtonElement>) => {
    const handleMouseDownPasswordConfirmation = (event) => {
        event.preventDefault();
    };

    return (
        <section className='signin'>
            <h1>Sign in</h1>
            <form className='signin__form' onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                    fullWidth
                    type="text"
                    id="outlined-basic"
                    label="Prénom"
                    variant="outlined"
                    {...register("firstname", {
                        required: {
                            value: true,
                            message: "Un prénom est requis."
                        },
                        minLength: {
                            value: 3,
                            message: "Le prénom doit contenir au moins 3 caractères."
                        }
                    })}
                    error={!!errors.firstname} // double négation converti la valeur en boolean
                    helperText={errors.firstname?.message} // ? pour éviter une erreur de typage si undefined
                />
                <TextField
                    fullWidth
                    type="email"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Un email est requis."
                        },
                        pattern: {
                            value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            message: "Veuillez entrer un email valide"
                        }
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                {/* <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl> */}
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Mot de passe"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Un mot de passe est requis."
                            },
                            minLength: {
                                value: 6,
                                message: "Le mot de passe doit contenir au moins 6 caractères."
                            }
                        })}
                    />
                    {errors.password && (
                        <p className='signin__error'>{errors.password.message}</p>
                    )}
                </FormControl>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-passwordConfirmation">Confirmation mot de passe</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-passwordConfirmation"
                        type={showPasswordConfirmation ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPasswordConfirmation}
                                    onMouseDown={handleMouseDownPasswordConfirmation}
                                    edge="end"
                                >
                                    {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirmation mot de passe"
                        {...register("passwordConfirmation", {
                            required: {
                                value: true,
                                message: "Veuillez confirmer votre mot de passe."
                            },
                            validate: (value) => {
                                // validate: (value: string) => {
                                if (watch('password') !== value) {
                                    return "Vos mots de passe doivent correspondre.";
                                }
                            },
                        })}
                    />
                    {errors.passwordConfirmation && (
                        <p className='signin__error'>{errors.passwordConfirmation.message}</p>
                    )}
                </FormControl>
                {/* <TextField
                    fullWidth
                    type="password"
                    id="outlined-basic"
                    label="Mot de passe"
                    variant="outlined"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Un mot de passe est requis."
                        },
                        minLength: {
                            value: 6,
                            message: "Le mot de passe doit contenir au moins 6 caractères."
                        }
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <TextField
                    fullWidth
                    type="password"
                    id="outlined-basic"
                    label="Confirmation mot de passe"
                    variant="outlined"
                    {...register("passwordConfirmation", {
                        required: {
                            value: true,
                            message: "Veuillez confirmer votre mot de passe."
                        },
                        validate: (value) => {
                            // validate: (value: string) => {
                            if (watch('password') !== value) {
                                return "Vos mots de passe doivent correspondre.";
                            }
                        },
                    })}
                    error={!!errors.passwordConfirmation}
                    helperText={errors.passwordConfirmation?.message}
                /> */}
                <FormControlLabel
                    control={<Checkbox />}
                    label="J'accepte les CGU."
                    {...register("checkbox", {
                        required: {
                            value: true,
                            message: "Vous devez accepter les CGU pour vous inscrire."
                        }
                    })}
                />
                {errors.checkbox && (
                    <p className='signin__error'>{errors.checkbox.message}</p>
                )}

                <Button
                    className='signin__button'
                    type="submit"
                    variant="contained"
                >
                    Sinscrire
                </Button>
            </form>
        </section>
    )
}