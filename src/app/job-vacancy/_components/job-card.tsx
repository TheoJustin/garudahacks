import {Button} from '@/lib/components/ui/button';
import {Card} from '@/lib/components/ui/card';
import {Heart} from 'lucide-react';
import Image from 'next/image';
import placeholder from '@/public/google.png';
import TypeBadge from '../../_components/type-badge';

interface JobCardInterface {
	logo: string;
	company: string;
	position: string;
	numberOfSlots: number;
	startingSalary: number;
	jobType: string[];
}

export default function JobCard({logo, company, position, numberOfSlots, startingSalary, jobType}: JobCardInterface) {
	const colors = ['#ffe1cc', '#d5f6ed', '#e2dbfa', '#fbe2f5', '#eceff4'];

	return (
		<Card className="w-full min-h-32 rounded-3xl p-3 flex flex-col gap-5">
			<div
				className="w-full h-full rounded-2xl p-3"
				style={{backgroundColor: colors[Math.floor(Math.random() * 5)]}}
			>
				<div className="flex flex-col h-full gap-3 justify-between">
					<div className="flex justify-between items-center">
						<div className="bg-white h-fit w-fit rounded-full font-semibold">
							<Image
								width={2000}
								height={2000}
								className="w-10 h-10 object-cover"
								src={logo}
								alt="coverImage"
							/>
						</div>
						<div className="bg-white h-fit w-fit px-2 py-1 rounded-full text-base font-semibold whitespace-nowrap inline-block">
							{`${numberOfSlots} Slot${numberOfSlots == 1 ? '' : 's'}`}
						</div>
					</div>
					<div>
						<div className="text-xl">{company}</div>
						<div className="flex justify-between items-end">
							<div className="text-3xl font-semibold w-1/2">{position}</div>
							<div className="bg-white h-fit w-fit p-2 rounded-full font-semibold flex justify-center items-center">
								<Heart className="w-5 h-5" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full gap-2 flex flex-col">
				<div className="flex gap-3 mb-6 flex-wrap">
					{jobType.map((job, i) => {
						if (i < 3) {
							return (
								<TypeBadge
									key={i}
									type={job}
								/>
							);
						}
						if (i == 3) {
							return (
								<TypeBadge
									key={i}
									type={`+${jobType.length - 3}`}
								/>
							);
						}
					})}
				</div>
				<div>
					<div className="text-lg">Starting at</div>
					<div className="text-xl font-semibold">{`Rp ${startingSalary.toLocaleString()}/Month`}</div>
				</div>
				<Button className="w-full bg-black rounded-xl">Apply</Button>
			</div>
		</Card>
	);
}
