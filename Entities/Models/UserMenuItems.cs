using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("UserMenuItems", Schema = "AccessRight")]
    public partial class UserMenuItems
    {
        [Key]
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public int MenuItemId { get; set; }

        [ForeignKey(nameof(MenuItemId))]
        [InverseProperty(nameof(MenuItems.UserMenuItems))]
        public virtual MenuItems MenuItem { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty(nameof(Users.UserMenuItems))]
        public virtual Users User { get; set; }
    }
}
