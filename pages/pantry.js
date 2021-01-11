import Link from "next/link";

import s from 'styles/pantry.module.scss';

const Pantry = () => {

    return (
			<div className={s["pantry"]}>
				<h1>PantryStatus: coming soon</h1>
				<Link href="/">← go back</Link>
			</div>
		);
}

export default Pantry;