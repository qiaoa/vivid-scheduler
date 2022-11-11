/* Project Class
** Each project has a name, owner, type, startDate, and description (submitted by user).
**
** The checkPoints array stores all of the checkPoints associated with the project. 
** Checkpoints are automatically generated in 1 week increments based on the startDate. 
 */
export class Project {

  constructor(
    public _id: number,
    public pname: string,
    public powner: string,
    public ptype: string, // Instagram Reel, Youtube Video, Tiktok, Other
    public pstartDate: Date,
    public checkPoints: Array<Checkpoint>, // automated 1 week increment
    public pdescription: string,
    public completed: string,
    public url: string
  ) {  }

}

/* Checkpoint Class
** Each checkpoint contains the project name, checkpoint name, and checkpoint date.
** 
** Checkpoint names are generated as 'pname + Checkpoint 1', 'pname + Checkpoint 2', etc.
** Checkpoint dates are generated in 1 week increments based on project startDate.
*/
export class Checkpoint {

  constructor (
    public pname: string,
    public cname: string,
    public cdate: Date
  ) { }
}
