import logo from './logo.svg';
import './App.css';
import { useState, useRef } from 'react';

function App() {
    const required = ['fname', 'lname', 'email'];

    const countryCodes = [
        {
            label: 'AM',
            code: '+374',
        },
        {
            label: 'A',
            code: '+37',
        },
        {
            label: 'AM',
            code: '+374',
        },
    ];

    const [info, setInfo] = useState({
        fname: '',
        lname: '',
        phone: { number: '', code: countryCodes[0].code },
        email: '',
        gender: '1',
    });
    const [errors, setErrors] = useState({
        fname: '',
        lname: '',
        phone: '',
        email: '',
    });
    const code = useRef('');

    const handleChange = (e) => {
        setErrors({
            ...errors,
            [e.target.name]: '',
        });

        switch (e.target.name) {
            case 'fname':
            case 'lname':
                if (e.target.value.length > 15) {
                    setErrors({
                        ...errors,
                        [e.target.name]: 'Length must be smaller than 15',
                    });
                }
        }

        setInfo({
            ...info,
            [e.target.name]:
                e.target.name === 'phone'
                    ? { number: e.target.value, label: code.current.value }
                    : e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        switch (e.target.name) {
            case 'fname':
            case 'lname':
            case 'email':
                if (e.target.value.length === 0) {
                    setErrors({
                        ...errors,
                        [e.target.name]: 'This field is required',
                    });
                }
        }

        // if ((info.fname = '')) {
        //     setErrors({ ...errors, fname: 'This field is required' });
        // }
        // info.forEach((field) => {
        // 	if (field i)
        // });
        // let a = ;
        if (Object.values(errors).every((error) => error === '')) {
            console.log(info);
            setInfo({
                fname: '',
                lname: '',
                phone: { number: '', label: countryCodes[0].code },
                email: '',
                gender: '1',
            });
        } else {
            console.log(errors);
        }
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fname">First Name: </label>
                    <input
                        type="text"
                        id="fname"
                        name="fname"
                        // maxLength="15"
                        value={info.fname}
                        onChange={handleChange}
                        // required
                    />
                    <br />
                    <span className="error">{errors.fname}</span>
                </div>
                <br />
                <div>
                    <label>Last Name: </label>
                    <input
                        type="text"
                        // maxLength="15"
                        name="lname"
                        value={info.lname}
                        onChange={handleChange}
                        // required
                    />
                    <br />
                    <span className="error">{errors.lname}</span>
                </div>
                <br />
                <div>
                    <label>Phone Number: </label>
                    <select ref={code}>
                        {countryCodes.map(({ label, code }, index) => (
                            <option value={label} key={index}>
                                {code}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        maxLength="10"
                        name="phone"
                        value={info.phone.number}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={info.email}
                        onChange={handleChange}
                        // required
                    />
                </div>
                <br />
                <select name="gender" onChange={handleChange}>
                    <option value="1">male</option>
                    <option value="0">female</option>
                </select>
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;
