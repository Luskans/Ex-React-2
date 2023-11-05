import { useForm } from 'react-hook-form'

export default function Inscription() {
    const form = useForm();
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;
    const { name, ref, onChange, onBlur } = register('firstname');

    const onSubmit = (data) => {
        console.log('form submitted', data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <label htmlFor='firstname'>Prénom</label>
            <imput 
                type='text' 
                id='firstname' 
                name={name} 
                ref={ref} 
                onChange={onChange} 
                onBlur={onBlur} 
            />
            <p>{errors.firstname?.message}</p>

            <label htmlFor='lastname'>Nom</label>
            <imput 
                type='text' 
                id='lastname' 
                {...register('lastname')} 
            />
        </form>
    )
}
