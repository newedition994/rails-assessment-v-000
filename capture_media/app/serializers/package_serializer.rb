class PackageSerializer < ActiveModel::Serializer
  attributes :id, :name, :description

  has_many :appointments
end
