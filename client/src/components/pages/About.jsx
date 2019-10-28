import React, {useState, useEffect} from 'react';

const About = () => {

    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(count)
    });

    const onClick = () => {
        setCount(count + 1)
    };

    return (
        <div>
            <h1>About app</h1>
            <h2>{count}</h2>
            <button onClick={onClick}>Increase</button>
            <p className='my-1'>FullStack app created with <b>M</b>ongoDB, <b>E</b>xpress, <b>R</b>eact, <b>N</b>ode.js</p>
            <p className='bg-dark p'>
                <strong>Version: </strong>1.0.0
            </p>
        </div>
    );
};

export default About;
