import { Personnel } from "./Personnel";

export interface Avancement {
    id : number ;
    tpersonnel: Personnel;
    nom : string ; 
    d_effet: string;
    d_p_av : string ;
    ech :string ; 
    ind_diff : string ;  
    observation : string ;
}
