import Link from 'next/link'
import { FaXTwitter } from 'react-icons/fa6'
import { LuGithub } from 'react-icons/lu'

export function Socials() {
	return (
		<div className="flex flex-row gap-4">
			<Link href="https://twitter.com/sachinraja" target="_blank">
				<FaXTwitter size={20} />
			</Link>
			<Link href="https://github.com/sachinraja" target="_blank">
				<LuGithub size={20} />
			</Link>
		</div>
	)
}
