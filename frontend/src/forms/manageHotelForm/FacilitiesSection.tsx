import { hotelFacilities } from "../../config/hotel-options-config";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const { register, formState: { errors } } = useFormContext<HotelFormData>();
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-3">Facilities</h2> 
      <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label key={facility } className="flex items-center gap-1 text-sm">
            <input type="checkbox" value={facility} {...register("facilities", {
              validate: (facilities) => {
                if(facilities && facilities.length > 0) {
                  return true;
                } else{
                  return "At least one facility required"; 
                }
              }
            })} />
            {facility} 
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-400 text-xs">{errors.facilities.message}</span>
      )}
    </div>
  )
}

export default FacilitiesSection;

