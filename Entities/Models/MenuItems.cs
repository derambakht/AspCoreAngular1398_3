using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("MenuItems", Schema = "AccessRight")]
    public partial class MenuItems
    {
        public MenuItems()
        {
            UserMenuItems = new HashSet<UserMenuItems>();
        }

        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(64)]
        public string MenuTitle { get; set; }
        [StringLength(128)]
        public string Path { get; set; }
        public int? ParentId { get; set; }
        public bool IsActive { get; set; }

        [InverseProperty("MenuItem")]
        public virtual ICollection<UserMenuItems> UserMenuItems { get; set; }
    }
}
