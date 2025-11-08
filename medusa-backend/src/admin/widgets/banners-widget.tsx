import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { useState, useEffect } from "react";
import { supabase } from "../../integrations/supabase/client";
import BannerForm from "../components/banner-form";

const BannersWidget = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("promotional_banners")
      .select("*")
      .order("placement", { ascending: true })
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching banners:", error);
    } else {
      setBanners(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;

    const { error } = await supabase
      .from("promotional_banners")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting banner:", error);
      alert("Failed to delete banner");
    } else {
      fetchBanners();
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("promotional_banners")
      .update({ is_active: !currentStatus })
      .eq("id", id);

    if (error) {
      console.error("Error updating banner:", error);
      alert("Failed to update banner");
    } else {
      fetchBanners();
    }
  };

  const handleEdit = (banner: any) => {
    setEditingBanner(banner);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingBanner(null);
    fetchBanners();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingBanner(null);
  };

  if (showForm) {
    return (
      <BannerForm
        banner={editingBanner}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Promotional Banners</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create Banner
        </button>
      </div>

      {loading ? (
        <p>Loading banners...</p>
      ) : banners.length === 0 ? (
        <p className="text-gray-500">No banners yet. Create your first banner!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="pb-2">Image</th>
                <th className="pb-2">Title</th>
                <th className="pb-2">Placement</th>
                <th className="pb-2">Link Type</th>
                <th className="pb-2">Order</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner.id} className="border-b">
                  <td className="py-2">
                    <img 
                      src={banner.image_url} 
                      alt={banner.title}
                      className="w-16 h-10 object-cover rounded"
                    />
                  </td>
                  <td className="py-2">{banner.title}</td>
                  <td className="py-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {banner.placement}
                    </span>
                  </td>
                  <td className="py-2">
                    <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                      {banner.link_type}
                    </span>
                  </td>
                  <td className="py-2">{banner.display_order}</td>
                  <td className="py-2">
                    <button
                      onClick={() => handleToggleActive(banner.id, banner.is_active)}
                      className={`text-xs px-2 py-1 rounded ${
                        banner.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {banner.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(banner)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export const config = defineWidgetConfig({
  zone: "product.list.before",
});

export default BannersWidget;
