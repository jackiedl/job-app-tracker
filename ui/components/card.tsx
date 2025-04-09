import { 
  AlertIcon, 
  CalenderIcon, 
  GroupIcon,
  PageIcon,

} from "../icons";

const iconMap = {
  applied: PageIcon,
  rejected: AlertIcon,
  interview: CalenderIcon,
  offers: GroupIcon,
};

const colorMap = {
  applied: "bg-blue-light-300 dark:bg-blue-light-800",
  rejected: "bg-red-300 dark:bg-red-600",
  interview: "bg-orange-300 dark:bg-orange-600",
  offers: "bg-success-300 dark:bg-success-800",
}

export default function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'applied' | 'rejected' | 'interview' | 'offers';
}) {

  const Icon = iconMap[type];
  const Color = colorMap[type];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className={`flex items-center justify-center ${Color} w-12 h-12 rounded-xl`}>
        {Icon ? <Icon className="text-gray-800 size-6 dark:text-white/90" /> : null}
      </div>

      <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {title}
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {value}
            </h4>
          </div>
        </div>

    </div>
  )

}