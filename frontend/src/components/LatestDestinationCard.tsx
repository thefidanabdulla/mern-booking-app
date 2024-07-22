import {HotelType} from "../../../backend/src/shared/types.ts";
import {Link} from "react-router-dom";

type Props = {
    hotel: HotelType;
}

const LatestDestinationCard = ({ hotel }: Props) => {
    return(
        <Link to={`/detail/${hotel._id}`} className={'relative group cursor-pointer overflow-hidden rounded-md'}>
            <div className={'h-[300px] overflow-hidden'}>
                <img src={hotel.imageUrls[0]} className={'group-hover:scale-110 transition-all duration-300 w-full h-full object-cover object-center'} alt={hotel.name} />
            </div>
            <div className={'absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md'}>
                <span className={'text-white font-bold tracking-tight text-3xl'}>{hotel.name}</span>
            </div>
        </Link>
    )
}

export default LatestDestinationCard;



