export class Constants {
    static defaultRoleId: number = 2; // Default role ID for new users
    static defaultGender: string = 'female'; // Default gender for new users
    
    static genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
    ];

    // Additional constants for the application
    static adminRoleId: number = 1;
    static userRoleId: number = 2;
    
    static roles = [
        { id: 1, name: 'admin', description: 'Administrator with full access' },
        { id: 2, name: 'user', description: 'Regular user with limited access' }
    ];
}