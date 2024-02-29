import os

def print_file_names():
    # Get the current directory
    current_directory = os.getcwd()

    # List all files in the current directory
    file_names = os.listdir(current_directory)

    # Print the file names
    for file_name in file_names:
        print(file_name)

# Call the function to print file names
print_file_names()
