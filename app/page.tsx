import DotCanvas from '@/components/DotCanvas';
import Content from '@/components/Content';
import { WavyBackground } from "@/components/ui/wavy-background";

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

/*
<div className="fixed left-0">
				<WavyBackground speed="slow" colors={["#995cd0", "#8edf5f", "#ec7744", "#5549b7", "#201d30"]} backgroundFill="rgb(21, 21, 21)">
				</WavyBackground>
			</div>
*/