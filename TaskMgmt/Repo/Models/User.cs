using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Repo
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string FirstName{ get; set; }
        public string LastName{ get; set; }
        public string Email{ get; set; }
        public string Gender{ get; set; }
        public string Phone{ get; set; }
        public string CreatedAt{ get; set; }
        public string IsActive{ get; set; }
        public string ProfilePicture{ get; set; }
        
        [ForeignKey("Role")]
        public int RoleId { get; set; }
        public virtual Role Role{ get; set; }
        public ICollection<TaskItem> Tasks { get; set; }
    }

}
