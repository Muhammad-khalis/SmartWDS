import { useEffect, useState } from "react";
import axios from "axios";
import { 
  UserPlus, ShieldCheck, Edit3, Trash2, Search, X, 
  CheckCircle2, AlertCircle, Loader2, Activity, Lock 
} from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "Operator" });

  const currentUserRole = localStorage.getItem("userRole");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.users || res.data;
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Registry Sync Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setFormData({ name: user.name, email: user.email, password: "", role: user.role });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      if (editingUserId) {
        await axios.put(`http://localhost:5000/api/users/${editingUserId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:5000/api/auth/register", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (err) {
      alert("Unauthorized Access.");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers(); 
    } catch (err) {
      alert("Admin clearance required.");
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const getRoleBadge = (role) => {
    const roles = {
      SuperAdmin: 'bg-rose-50 text-rose-600 border-rose-100',
      WarehouseManager: 'bg-blue-50 text-blue-600 border-blue-100',
      DispatchManager: 'bg-amber-50 text-amber-600 border-amber-100',
      Operator: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    };
    return roles[role] || 'bg-slate-50 text-slate-600 border-slate-100';
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin text-indigo-600 mb-2" size={32} />
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Syncing Data...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">User Registry</h1>
            <p className="text-sm text-slate-500">Manage system access and permissions</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => { setEditingUserId(null); setFormData({name:"", email:"", password:"", role:"Operator"}); setIsModalOpen(true); }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm"
            >
              <UserPlus size={16} /> Add User
            </button>
          </div>
        </div>

        {/* LIST SECTION */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4 text-center">Role</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => (
                <tr key={u._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{u.name}</div>
                        <div className="text-xs text-slate-500">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-tight ${getRoleBadge(u.role)}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => handleEditClick(u)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all">
                        <Edit3 size={16} />
                      </button>
                      {currentUserRole === "SuperAdmin" && (
                        <button onClick={() => deleteUser(u._id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 relative border border-slate-100">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"><X size={20}/></button>
            <h2 className="text-xl font-bold text-slate-900 mb-6">{editingUserId ? "Edit User" : "Add New User"}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
                <input type="text" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-all" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})}/>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                <input type="email" required className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-all" value={formData.email} onChange={(e)=>setFormData({...formData, email: e.target.value})}/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Password</label>
                  <input type="password" placeholder={editingUserId ? "••••" : ""} required={!editingUserId} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-all" value={formData.password} onChange={(e)=>setFormData({...formData, password: e.target.value})}/>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</label>
                  <select className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 transition-all" value={formData.role} onChange={(e)=>setFormData({...formData, role: e.target.value})}>
                    <option value="Operator">Operator</option>
                    <option value="WarehouseManager">Warehouse Manager</option>
                    <option value="DispatchManager">Dispatch Manager</option>
                    <option value="SuperAdmin">Super Admin</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold text-sm shadow-md hover:bg-indigo-700 transition-all mt-4">
                {editingUserId ? "Save Changes" : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;