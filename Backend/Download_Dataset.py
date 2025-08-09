import kagglehub
import shutil
import os

# Create a local cache folder inside backend
project_cache_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cache")
os.makedirs(project_cache_dir, exist_ok=True)

# Download latest version to KaggleHub cache
cache_path = kagglehub.dataset_download("sparshx/crop-yeild-dataset")
print("Downloaded to KaggleHub cache:", cache_path)

# Copy dataset to our local project cache
dest_path = os.path.join(project_cache_dir, "crop-yeild-dataset")
if os.path.exists(dest_path):
    shutil.rmtree(dest_path)  # Clear old dataset
shutil.copytree(cache_path, dest_path)

print("✅ Dataset saved in project cache:", dest_path)
