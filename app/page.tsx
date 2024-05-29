import DotCanvas from '@/components/DotCanvas';
import Content from '@/components/Content';
import type { Metadata } from "next";

export const metadata: Metadata = {
	verification: {
		google: "6R-LJXdq7awsZz7vgPzCclXRtDmS8XsZAEhJDg4QG9g",
	},
};

export default function Home() {
	return (
		<>

			<div className="fixed">
				<DotCanvas />
			</div>






			<Content />

		</>
	);
}
