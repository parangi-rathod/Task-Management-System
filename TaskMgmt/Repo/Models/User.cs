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
        
        [ForeignKey("Role")]
        public int RoleId { get; set; }
        public virtual Role Role{ get; set; }


        public ICollection<TaskItem> Tasks { get; set; }
    }

}
