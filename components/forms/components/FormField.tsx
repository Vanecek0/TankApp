import { View } from "react-native";
import ScaledText from "@/components/common/ScaledText";
import { spacing } from "@/utils/SizeScaling";
import { ThemeColors as Colors } from "@/constants/Colors";
import { useTheme } from "@/theme/ThemeProvider";

type FormFieldProps = {
  label?: React.ReactNode;
  error?: string;
  hint?: string;
  children: React.ReactNode;
};

export function FormField({
  label,
  error,
  hint,
  children,
}: FormFieldProps) {
  const { isDark } = useTheme();

  return (
    <View>
      {label && (
        <ScaledText
          size="base"
          style={{ color: isDark ? Colors.base.white : Colors.base.black }}
        >
          {label}
        </ScaledText>
      )}

      {children}

      {error && (
        <ScaledText
          size="sm"
          style={{ color: Colors.status.error, ...spacing.mt(2) }}
        >
          {error}
        </ScaledText>
      )}

      {!error && hint && (
        <ScaledText
          size="sm"
          style={{ color: Colors.text.disabled, ...spacing.mt(2) }}
        >
          {hint}
        </ScaledText>
      )}
    </View>
  );
}