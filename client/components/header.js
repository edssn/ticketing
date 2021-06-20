import Link from 'next/link';

export default function Header ({ currentUser }) {
    const links = [
        !currentUser && { label: 'Sign Up', href: '/auth/signup'},
        !currentUser && { label: 'Sign In', href: '/auth/signin'},
        currentUser && { label: 'Sell Tickets', href: '/tickets/new'},
        currentUser && { label: 'My Orders', href: '/orders'},
        currentUser && { label: 'Sign Out', href: '/auth/signout'},
    ]
        .filter(linkConfig => linkConfig)
        .map(({label, href}) => {
            return <li key={href} className="nav-item">
                <Link href={href}>
                    <a className="nav-link">{label}</a>
                </Link>        
            </li>
        });

    return <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link href="/">
                <a className="navbar-brand">GitTix</a>
            </Link>

            <div className="d-flex" id="navbarNav">
                <ul className="navbar-nav">
                    {links}
                </ul>
            </div>
        </div>
    </nav>
}