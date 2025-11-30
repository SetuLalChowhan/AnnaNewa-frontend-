'use client';

import React, { useState, FC, ChangeEvent } from 'react';
import { useForm, Controller, SubmitHandler, FieldError } from 'react-hook-form';
import { X, Upload, Calendar } from 'lucide-react';

// Types
interface LocationData {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ImagePreview {
  name: string;
  preview: string;
  file: File;
}

interface ProductFormData {
  title: string;
  description: string;
  pricePerKg: string;
  totalWeight: string;
  category: 'fruits' | 'vegetables' | 'grains' | 'dairy' | 'others';
  expiryDate: string;
  postType: 'sell' | 'buy';
  location: LocationData;
  images: File[];
}

interface BackendPayload {
  title: string;
  description: string;
  pricePerKg: number;
  totalWeight: number;
  category: string;
  expiryDate: string;
  postType: string;
  location: LocationData;
  images: Array<{
    name: string;
    size: number;
    type: string;
  }>;
}

interface CalendarInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const PRIMARY_COLOR = '#10b981';

const CalendarInput: FC<CalendarInputProps> = ({ value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(
    value ? new Date(value) : new Date()
  );

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = (): void => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = (): void => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleSelectDate = (day: number): void => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    const formattedDate = selectedDate.toISOString().split('T')[0];
    onChange(formattedDate);
    setIsOpen(false);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days: (number | null)[] = Array(firstDay).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formattedValue = value
    ? new Date(value).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    : '';

  return (
    <div className="relative">
      <div
        className="w-full px-4 py-3 border rounded-lg flex items-center justify-between cursor-pointer hover:border-gray-400 transition"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: isOpen ? `${PRIMARY_COLOR}05` : 'white',
          borderColor: error ? '#dc2626' : '#d1d5db'
        }}
      >
        <span className={formattedValue ? 'text-gray-900 font-medium' : 'text-gray-400'}>
          {formattedValue || 'Select expiry date'}
        </span>
        <Calendar className="w-5 h-5" style={{ color: PRIMARY_COLOR }} />
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 p-4 w-full max-w-sm">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition font-bold text-lg"
            >
              ←
            </button>
            <h3 className="font-bold text-gray-800">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition font-bold text-lg"
            >
              →
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-3">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-xs font-bold text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {days.map((day, idx) => {
              if (!day) {
                return <div key={`empty-${idx}`} className="p-2" />;
              }

              const dateForDay = new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                day
              );
              dateForDay.setHours(0, 0, 0, 0);

              const isCurrentDay = dateForDay.getTime() === today.getTime();
              const isSelectedDay = value === new Date(
                currentMonth.getFullYear(),
                currentMonth.getMonth(),
                day
              ).toISOString().split('T')[0];
              const isDisabled = dateForDay < today;

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  onClick={() => !isDisabled && handleSelectDate(day)}
                  disabled={isDisabled}
                  className={`p-2 rounded text-sm font-medium transition ${
                    isDisabled
                      ? 'text-gray-300 cursor-not-allowed'
                      : isSelectedDay
                      ? 'text-white font-bold'
                      : isCurrentDay
                      ? 'text-gray-700 border-2'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  style={
                    isSelectedDay
                      ? { backgroundColor: PRIMARY_COLOR }
                      : isCurrentDay
                      ? { borderColor: PRIMARY_COLOR }
                      : {}
                  }
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Close
          </button>
        </div>
      )}

      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

const ProductForm: FC = () => {
  const [previewImages, setPreviewImages] = useState<ImagePreview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { control, handleSubmit, formState: { errors }, reset } = useForm<ProductFormData>({
    mode: 'onChange',
    defaultValues: {
      title: 'Banana',
      description: 'Fresh organic tomatoes from our farm',
      pricePerKg: '50',
      totalWeight: '50',
      category: 'fruits',
      expiryDate: '2025-12-31',
      postType: 'sell',
      location: {
        address: 'Farm Road 123',
        city: 'Pune',
        state: 'Maharashtra',
        zipCode: '411001',
      },
      images: [],
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    if (previewImages.length + files.length > 5) {
      setError('Maximum 5 images allowed');
      return;
    }

    setError('');

    files.forEach((file: File) => {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>): void => {
        const result = event.target?.result as string;
        setPreviewImages((prev: ImagePreview[]) => [
          ...prev,
          {
            name: file.name,
            preview: result,
            file: file,
          },
        ]);
      };
      reader.onerror = (): void => {
        setError('Failed to read file');
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number): void => {
    setPreviewImages((prev: ImagePreview[]) =>
      prev.filter((_: ImagePreview, i: number) => i !== index)
    );
  };

  const onSubmit: SubmitHandler<ProductFormData> = async (
    data: ProductFormData
  ): Promise<void> => {
    setIsLoading(true);
    setError('');

    try {
      if (previewImages.length === 0) {
        setError('Please upload at least one image');
        setIsLoading(false);
        return;
      }

      const payload: BackendPayload = {
        title: data.title.trim(),
        description: data.description.trim(),
        pricePerKg: parseFloat(data.pricePerKg),
        totalWeight: parseFloat(data.totalWeight),
        category: data.category,
        expiryDate: data.expiryDate,
        postType: data.postType,
        location: {
          address: data.location.address.trim(),
          city: data.location.city.trim(),
          state: data.location.state.trim(),
          zipCode: data.location.zipCode.trim(),
        },
        images: previewImages.map((img: ImagePreview) => ({
          name: img.name,
          size: img.file.size,
          type: img.file.type,
        })),
      };

      console.log('📤 === DATA SENT TO BACKEND ===');
      console.log(payload);
      console.log('📊 === CALCULATION DETAILS ===');
      console.log(`Total Price: ₹${payload.pricePerKg * payload.totalWeight}`);
      console.log(`Images Count: ${payload.images.length}`);
      console.log('='.repeat(40));

      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('✅ Form submitted successfully!');
      alert('✅ Form submitted successfully! Check console for data.');

      reset();
      setPreviewImages([]);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('❌ Submission Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-black" >
      <div className="">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-100">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ color: PRIMARY_COLOR }}>
              Product Listing
            </h1>
            <p className="text-gray-600 text-lg">List your fresh farm products for sale</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 rounded-lg flex items-start gap-3" style={{ borderLeftColor: '#dc2626' }}>
           
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Title *
              </label>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: 'Title is required',
                  minLength: { value: 3, message: 'Minimum 3 characters' },
                  maxLength: { value: 100, message: 'Maximum 100 characters' },
                }}
                render={({ field }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter product title"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition"
                      style={{ '--tw-ring-color': PRIMARY_COLOR } as React.CSSProperties}
                    />
                    {errors.title && (
                      <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
                    )}
                  </>
                )}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: 'Description is required',
                  minLength: { value: 10, message: 'Minimum 10 characters' },
                  maxLength: { value: 500, message: 'Maximum 500 characters' },
                }}
                render={({ field }) => (
                  <>
                    <textarea
                      {...field}
                      placeholder="Describe your product in detail"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition resize-none"
                      style={{ '--tw-ring-color': PRIMARY_COLOR } as React.CSSProperties}
                    />
                    {errors.description && (
                      <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
                    )}
                  </>
                )}
              />
            </div>

            {/* Price and Weight */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price per KG (₹) *
                </label>
                <Controller
                  name="pricePerKg"
                  control={control}
                  rules={{
                    required: 'Price is required',
                    pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Invalid price format' },
                    validate: (value) =>
                      parseFloat(value) > 0 || 'Price must be greater than 0',
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="number"
                        placeholder="50"
                        step="0.01"
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition"
                        style={{ '--tw-ring-color': PRIMARY_COLOR } as React.CSSProperties}
                      />
                      {errors.pricePerKg && (
                        <p className="text-red-600 text-sm mt-1">{errors.pricePerKg.message}</p>
                      )}
                    </>
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Weight (KG) *
                </label>
                <Controller
                  name="totalWeight"
                  control={control}
                  rules={{
                    required: 'Weight is required',
                    pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Invalid weight format' },
                    validate: (value) =>
                      parseFloat(value) > 0 || 'Weight must be greater than 0',
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="number"
                        placeholder="50"
                        step="0.01"
                        min="0"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition"
                        style={{ '--tw-ring-color': PRIMARY_COLOR } as React.CSSProperties}
                      />
                      {errors.totalWeight && (
                        <p className="text-red-600 text-sm mt-1">{errors.totalWeight.message}</p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <Controller
                name="category"
                control={control}
                rules={{ required: 'Category is required' }}
                render={({ field }) => (
                  <>
                    <select
                      {...field}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition"
                      style={{ '--tw-ring-color': PRIMARY_COLOR } as React.CSSProperties}
                    >
                      <option value="fruits">Fruits</option>
                      <option value="vegetables"> Vegetables</option>
                      <option value="grains">Grains</option>
                      <option value="dairy">Dairy</option>
                      <option value="others">Others</option>
                    </select>
                    {errors.category && (
                      <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
                    )}
                  </>
                )}
              />
            </div>

            {/* Expiry Date - Custom Calendar */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expiry Date *
              </label>
              <Controller
                name="expiryDate"
                control={control}
                rules={{
                  required: 'Expiry date is required',
                  validate: (value: string) => {
                    if (!value) return 'Expiry date is required';
                    const expiry = new Date(value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    expiry.setHours(0, 0, 0, 0);
                    return expiry > today || 'Expiry date must be in the future';
                  },
                }}
                render={({ field }) => (
                  <CalendarInput
                    value={field.value || ''}
                    onChange={field.onChange}
                    error={errors.expiryDate?.message}
                  />
                )}
              />
            </div>

            {/* Post Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Post Type *
              </label>
              <Controller
                name="postType"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-4">
                    <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition"
                      style={{
                        borderColor: field.value === 'sell' ? PRIMARY_COLOR : '#e5e7eb',
                        backgroundColor: field.value === 'sell' ? `${PRIMARY_COLOR}10` : 'white'
                      }}>
                      <input
                        {...field}
                        type="radio"
                        value="sell"
                        checked={field.value === 'sell'}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="text-gray-700 font-medium">Sell</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition"
                      style={{
                        borderColor: field.value === 'buy' ? PRIMARY_COLOR : '#e5e7eb',
                        backgroundColor: field.value === 'buy' ? `${PRIMARY_COLOR}10` : 'white'
                      }}>
                      <input
                        {...field}
                        type="radio"
                        value="buy"
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span className="text-gray-700 font-medium">Buy</span>
                    </label>
                  </div>
                )}
              />
            </div>

            {/* Location */}
            <div className="space-y-4 p-5 bg-linear-to-b from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                📍 Location Details
              </h3>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address *
                </label>
                <Controller
                  name="location.address"
                  control={control}
                  rules={{
                    required: 'Address is required',
                    minLength: { value: 5, message: 'Address must be at least 5 characters' },
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        placeholder="Farm Road 123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition bg-white"
                        style={{ '--tw-ring-color': PRIMARY_COLOR } as React.CSSProperties}
                      />
                      {errors.location?.address && (
                        <p className="text-red-600 text-sm mt-1">{errors.location.address.message}</p>
                      )}
                    </>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City *
                  </label>
                  <Controller
                    name="location.city"
                    control={control}
                    rules={{
                      required: 'City is required',
                      minLength: { value: 2, message: 'City must be at least 2 characters' },
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          placeholder="Pune"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition bg-white"
                          style={{ '--tw-ring-color': PRIMARY_COLOR } as React.CSSProperties}
                        />
                        {errors.location?.city && (
                          <p className="text-red-600 text-sm mt-1">{errors.location.city.message}</p>
                        )}
                      </>
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    State *
                  </label>
                  <Controller
                    name="location.state"
                    control={control}
                    rules={{
                      required: 'State is required',
                      minLength: { value: 2, message: 'State must be at least 2 characters' },
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          placeholder="Maharashtra"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition bg-white"
                          style={{ '--tw-ring-color': PRIMARY_COLOR } as React.CSSProperties}
                        />
                        {errors.location?.state && (
                          <p className="text-red-600 text-sm mt-1">{errors.location.state.message}</p>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Zip Code *
                </label>
                <Controller
                  name="location.zipCode"
                  control={control}
                  rules={{
                    required: 'Zip Code is required',
                    pattern: { value: /^\d{6}$/, message: '6 digit zip code required' },
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type="text"
                        placeholder="411001"
                        maxLength={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition bg-white"
                        style={{ '--tw-ring-color': PRIMARY_COLOR } as React.CSSProperties}
                      />
                      {errors.location?.zipCode && (
                        <p className="text-red-600 text-sm mt-1">{errors.location.zipCode.message}</p>
                      )}
                    </>
                  )}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Images (Maximum 5) *
              </label>
              <div
                className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition hover:opacity-80"
                style={{ borderColor: PRIMARY_COLOR, backgroundColor: `${PRIMARY_COLOR}05` }}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-input"
                />
                <label htmlFor="image-input" className="cursor-pointer">
                  <Upload className="w-10 h-10 mx-auto mb-3" style={{ color: PRIMARY_COLOR }} />
                  <p className="text-gray-700 font-semibold text-lg">Click to upload images</p>
                  <p className="text-gray-500 text-sm">PNG, JPG, GIF up to 5MB (Max 5 images)</p>
                </label>
              </div>
            </div>

            {/* Image Preview */}
            {previewImages.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  🖼️ Preview ({previewImages.length}/5)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {previewImages.map((img: ImagePreview, index: number) => (
                    <div key={`${img.name}-${index}`} className="relative group">
                      <img
                        src={img.preview}
                        alt={`Preview ${index}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200 group-hover:border-gray-300 transition"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="text-xs text-gray-600 mt-1 truncate">{img.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="w-full py-4 rounded-lg font-semibold text-white transition disabled:opacity-50 hover:shadow-xl text-lg"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              {isLoading ? 'Submitting...' : 'List Product'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;