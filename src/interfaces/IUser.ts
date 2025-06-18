export interface IUserResource {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_url: string;
  phone: string;
  birth_of_date: Date;
}

export interface IUserCreate {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  address: string;
  email_alt: string;
  phone: string;
  nik: string;
  birth_of_date: string;
  home_address: string;
  ktp: File;
  profile: File;
  verification_key: string;
}
