function Footer() {

    const foot = {
        padding: '10px',
        borderRadius: '20px 20px 0 0',
        left: '0',
        bottom: '0',
        width: '100%',
        color: 'white',
        textAlign: 'center'
    }


    return <div className="bg-dark" style={foot}>
        <p className={'m-0'}>
            City Management System <br/>
            Smart City 	&copy; 2021
        </p>
    </div>
}

export default Footer;